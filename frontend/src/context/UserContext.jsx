import { createContext } from "react";

export const UserContext = createContext();

const UserContext = ({ children }) => {
  console.log("UserContext", children);

  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserContext;
