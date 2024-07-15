import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/${userId}/profile/edit`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8080/${userId}/profile/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('User profile updated successfully');
            } else {
                console.error('Error updating user profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} />
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} />
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" value={user.phone} onChange={handleInputChange} />
            <label htmlFor="address">Address:</label>
            <input type="text" name="address" value={user.address} onChange={handleInputChange} />
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" name="postalCode" value={user.postalCode} onChange={handleInputChange} />
            <label htmlFor="city">City:</label>
            <input type="text" name="city" value={user.city} onChange={handleInputChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={user.password} onChange={handleInputChange} />
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default UserProfile;
