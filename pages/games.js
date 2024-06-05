import dynamic from 'next/dynamic';

const GameComponent = dynamic(
  () => import('../components/gameComponent'),
  { ssr: false }  // This line is important. It disables server-side rendering for this module.
);

export default function GamePage() {
  return <GameComponent />;
}