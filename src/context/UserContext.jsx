import PropTypes from 'prop-types'; // Import PropTypes
import { UserDataContext } from './UserDataContext';


const UserContext = ({ children }) => {
    const [ user, setUser ] = useState({
        email:"",
        fullName:{
            firstName: "",
            lastName: ""
        }
    });
    return (
        <div>
            <UserDataContext.Provider value={user}>
                {children}
            </UserDataContext.Provider>
        </div>
    );
}

// Add prop types validation
UserContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;