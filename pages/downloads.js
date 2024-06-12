export default function Downloads() {
  return (
    <div>
      <h1>Downloads</h1>
      <p>Here you can find all the downloadable content we offer.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>File 1</td>
            <td>Description for File 1</td>
            <td><a href="/path/to/file1">Download</a></td>
          </tr>
          <tr>
            <td>File 2</td>
            <td>Description for File 2</td>
            <td><a href="/path/to/file2">Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
