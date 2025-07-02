'use client';

import { useSession } from 'next-auth/react';

export default function UserSession() {
  const { data: session, status } = useSession();

  console.log('Session Status:', status);
  console.log('Session Data:', session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div>
        <p>Logged in as: {session.user.email}</p>
        <p>Name: {session.user.name || 'Not set'}</p>
        <p>ID: {session.user.id || 'Not set'}</p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    );
  }

  return <div>Not signed in</div>;
} 