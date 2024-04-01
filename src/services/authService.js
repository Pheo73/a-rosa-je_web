const authService = {
  async login(username, password) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.access; 
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  async register(formData) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Registration successful');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },
  async addPlant(formData) {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/plants/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Plant added successfully');
      } else {
        throw new Error('Plant addition failed');
      }
    } catch (error) {
      console.error('Error adding plant:', error);
      throw error;
    }
  }
};

export default authService;
