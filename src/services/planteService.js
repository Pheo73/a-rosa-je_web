const planteService = {
  async sunExpo(token) {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/sun-exposures/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch sun exposures");
      }
    } catch (error) {
      console.error("Error fetching sun exposures:", error);
      throw error;
    }
  },

  async temperatureRanges(token) {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/temperature-ranges/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch temperature ranges");
      }
    } catch (error) {
      console.error("Error fetching temperature ranges:", error);
      throw error;
    }
  },

  async waterAmount(token) {
    try {
      const response = await fetch(`http://172.16.1.126:8000/api/watering-amounts/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch watering amounts");
      }
    } catch (error) {
      console.error("Error fetching watering amounts:", error);
      throw error;
    }
  },
 async getOffers(token) {
    try {
      const response = await fetch(
        `http://172.16.1.126:8000/api/guardian-requests/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Get offers failed:", error);
      throw error;
    }
  },
};

export default planteService;
