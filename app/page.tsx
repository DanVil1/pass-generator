import { PasswordGenerator } from '@/app/components/password-generator';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <PasswordGenerator />
    </main>
  );
}