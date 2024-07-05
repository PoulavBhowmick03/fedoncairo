import { useAccount } from "@starknet-react/core";

const RegisterUser = () => {
  const { account, address, status } = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {account ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Register User</h2>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Register User
            </button>
          </form>
        </div>
      ) : (
        <p>Please connect your wallet to register as a user.</p>
      )}
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default RegisterUser;
