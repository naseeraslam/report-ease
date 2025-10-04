import React, { useState, useEffect } from 'react';
import paymentService from '../services/paymentService';
import authService from '../services/authService';
import { UserDto } from '../types/auth.types';
// We would also fetch and display the user's current subscription status here.
// For now, we'll just focus on the upgrade flow.

const AccountPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleUpgradeClick = async (priceId: string) => {
    setError(null);
    try {
      const successUrl = `${window.location.origin}/dashboard?payment=success`;
      const cancelUrl = `${window.location.origin}/account`;

      const response = await paymentService.createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl,
      });

      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch (err) {
      setError('Failed to start the payment process. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Subscription</h2>
        <p className="mb-4">
          {/* Placeholder for current subscription status */}
          Your current plan: <span className="font-semibold">Free</span>
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-lg font-bold">Monthly Plan</h3>
            <p className="mb-4">Get full access with our monthly subscription.</p>
            <button
              onClick={() => handleUpgradeClick('price_12345_monthly')} // Replace with your actual Price ID
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Upgrade to Monthly
            </button>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-lg font-bold">Lifetime Plan</h3>
            <p className="mb-4">Pay once and get lifetime access to all features.</p>
            <button
              onClick={() => handleUpgradeClick('price_12345_lifetime')} // Replace with your actual Price ID
              className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Lifetime Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;