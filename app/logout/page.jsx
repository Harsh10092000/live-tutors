'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false });
      router.push('/');
    };

    handleLogout();
  }, [router]);

  return (
    <div className="tu-main-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="tu-loginholder">
              <div className="tu-loginheader">
                <h3>Logging out...</h3>
                <p>Please wait while we sign you out.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 