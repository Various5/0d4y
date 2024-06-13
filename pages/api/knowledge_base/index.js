import { getSession } from 'next-auth/react';
import db from '../../../db';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const handler = nextConnect()
  .use(upload.array('files'))
  .post(async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'You must be signed in to create a knowledge base article.' });
    }

    const { title, content, tags } = req.body;
    const files = req.files;

    try {
      db.query(
        'INSERT INTO knowledge_base_articles (title, content) VALUES (?, ?)',
        [title, content],
        (err, results) => {
          if (err) {
            console.error('Database error during article insertion:', err);
            return res.status(500).json({ message: 'Database error', error: err });
          }

          const articleId = results.insertId;

          if (tags && tags.length > 0) {
            const tagQueries = tags.split(',').map(tag =>
              db.query(
                'INSERT INTO knowledge_base_tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
                [tag.trim()],
                (tagErr, tagResults) => {
                  if (tagErr) {
                    console.error('Database error during tag insertion:', tagErr);
                  }
                }
              )
            );

            Promise.all(tagQueries)
              .then(tagResults => {
                const tagIds = tagResults.map(tagResult => tagResult.insertId);
                const articleTagQueries = tagIds.map(tagId =>
                  db.query('INSERT INTO knowledge_base_article_tags (article_id, tag_id) VALUES (?, ?)', [articleId, tagId], (articleTagErr) => {
                    if (articleTagErr) {
                      console.error('Database error during article-tag insertion:', articleTagErr);
                    }
                  })
                );

                return Promise.all(articleTagQueries);
              })
              .then(() => {
                if (files && files.length > 0) {
                  const fileQueries = files.map(file =>
                    db.query('INSERT INTO knowledge_base_files (article_id, filename, filepath) VALUES (?, ?, ?)', [
                      articleId,
                      file.originalname,
                      file.path,
                    ], (fileErr) => {
                      if (fileErr) {
                        console.error('Database error during file insertion:', fileErr);
                      }
                    })
                  );

                  return Promise.all(fileQueries);
                }
              })
              .then(() => res.status(200).json({ message: 'Article created successfully' }))
              .catch(tagError => {
                console.error('Tag insertion error:', tagError);
                res.status(500).json({ message: 'Tag insertion error', error: tagError });
              });
          } else {
            res.status(200).json({ message: 'Article created successfully' });
          }
        }
      );
    } catch (error) {
      console.error('Server error during article creation:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  })
  .get(async (req, res) => {
    const { search, sort } = req.query;
    let query = `
      SELECT a.*, GROUP_CONCAT(t.name) as tags 
      FROM knowledge_base_articles a 
      LEFT JOIN knowledge_base_article_tags at ON a.id = at.article_id 
      LEFT JOIN knowledge_base_tags t ON at.tag_id = t.id
    `;
    let queryParams = [];

    if (search) {
      query += ' WHERE a.title LIKE ? OR a.content LIKE ?';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    query += ' GROUP BY a.id';

    if (sort === 'title') {
      query += ' ORDER BY a.title';
    } else if (sort === 'tags') {
      query += ' ORDER BY tags';
    } else {
      query += ' ORDER BY a.created_at DESC';
    }

    try {
      console.log('Executing query:', query);
      console.log('With parameters:', queryParams);
      db.query(query, queryParams, (err, results) => {
        if (err) {
          console.error('Database error during article retrieval:', err);
          return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Server error during article retrieval:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
