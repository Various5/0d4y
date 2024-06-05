import { useState, useEffect } from 'react';

export default function RPGClicker() {
  const initialDate = new Date('1950-01-01T00:00:00Z');
  const [resources, setResources] = useState({ power: 0, water: 0, food: 0, materials: 100 });
  const [city, setCity] = useState({
    size: 1,
    buildings: [],
  });
  const [clickPower, setClickPower] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [population, setPopulation] = useState(10);
  const [stats, setStats] = useState({ births: 0, deaths: 0, averageAge: 30, males: 5, females: 5 });
  const [ageDistribution, setAgeDistribution] = useState(
    Array(120).fill(0).map(() => Math.floor(Math.random() * 1))
  );
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const autoResources = city.buildings.filter(b => b.type !== 'building').length;
      const factories = city.buildings.filter(b => b.type === 'factory').length;
      setResources(prevResources => ({
        power: prevResources.power + city.buildings.filter(b => b.type === 'power').length,
        water: prevResources.water + city.buildings.filter(b => b.type === 'water').length,
        food: prevResources.food + city.buildings.filter(b => b.type === 'food').length,
        materials: prevResources.materials + factories,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [city.buildings.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePopulation();
    }, 1000);
    return () => clearInterval(interval);
  }, [resources, population]);

  const updatePopulation = () => {
    const waterNeeded = population;
    const foodNeeded = population;
    const buildingSpace = city.buildings.filter(b => b.type === 'building').length * 100;

    if (resources.water >= waterNeeded && resources.food >= foodNeeded) {
      setResources(prevResources => ({
        ...prevResources,
        water: prevResources.water - waterNeeded,
        food: prevResources.food - foodNeeded,
      }));

      const newBirths = Math.min(Math.floor((stats.males * stats.females) / 100), 4);
      let newAgeDistribution = [...ageDistribution];
      newAgeDistribution[0] += newBirths;
      setAgeDistribution(newAgeDistribution);
      setPopulation(prevPop => prevPop + newBirths);
      setStats(prevStats => ({
        ...prevStats,
        births: prevStats.births + newBirths,
      }));
      updateAverageAge(newAgeDistribution);
    } else {
      let deaths = Math.ceil(population * 0.1); // 10% of the population dies if resources are insufficient
      let newAgeDistribution = [...ageDistribution];
      for (let i = newAgeDistribution.length - 1; i >= 0 && deaths > 0; i--) {
        if (newAgeDistribution[i] > 0) {
          const reduction = Math.min(newAgeDistribution[i], deaths);
          newAgeDistribution[i] -= reduction;
          deaths -= reduction;
        }
      }
      setAgeDistribution(newAgeDistribution);
      setPopulation(prevPop => prevPop - deaths);
      setStats(prevStats => ({
        ...prevStats,
        deaths: prevStats.deaths + deaths,
      }));
      updateAverageAge(newAgeDistribution);
    }

    let newAgeDistribution = ageDistribution.map((count, age) => (age < 119 ? count : 0));
    const naturalDeaths = ageDistribution[119];
    setAgeDistribution(newAgeDistribution);
    setPopulation(prevPop => prevPop - naturalDeaths);
    setStats(prevStats => ({
      ...prevStats,
      deaths: prevStats.deaths + naturalDeaths,
    }));

    if (population <= 0) {
      alert('Game Over! Your population has died out.');
      setPopulation(10);
      setResources({ power: 0, water: 0, food: 0, materials: 100 });
      setStats({ births: 0, deaths: 0, averageAge: 30, males: 5, females: 5 });
      setAgeDistribution(Array(120).fill(0).map(() => Math.floor(Math.random() * 1)));
      setDate(initialDate);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(prevDate => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateAverageAge = (newAgeDistribution) => {
    const totalAge = newAgeDistribution.reduce(
      (sum, count, age) => sum + count * age,
      0
    );
    const totalPopulation = newAgeDistribution.reduce((sum, count) => sum + count, 0);
    setStats(prevStats => ({
      ...prevStats,
      averageAge: totalPopulation > 0 ? totalAge / totalPopulation : 0,
    }));
  };

  const gatherResources = () => {
    setResources(prevResources => ({
      power: prevResources.power + clickPower,
      water: prevResources.water + clickPower,
      food: prevResources.food + clickPower,
      materials: prevResources.materials + clickPower,
    }));
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Assume the GIF duration is 1 second
  };

  const upgradeClickPower = () => {
    const upgradeCost = clickPower * 10;
    if (resources.power >= upgradeCost) {
      setResources(prevResources => ({
        ...prevResources,
        power: prevResources.power - upgradeCost,
      }));
      setClickPower(clickPower + 1);
    }
  };

  const upgradeCity = (type) => {
    const upgradeCost = city.size * 10;
    if (resources.materials >= upgradeCost) {
      setResources(prevResources => ({
        ...prevResources,
        materials: prevResources.materials - upgradeCost,
      }));
      setCity((prevCity) => {
        const newSize = prevCity.size + 1;
        const newBuilding = {
          type,
          x: Math.random() * 80, // Random x position
          y: Math.random() * 80, // Random y position
          scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8x and 1.2x
        };
        return {
          size: newSize,
          buildings: [...prevCity.buildings, newBuilding],
        };
      });
    }
  };

  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className="container">
      <h1>City Builder Clicker</h1>
      <div className="info-panel">
        <div id="resource-counter">
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Power</td><td>{resources.power}</td></tr>
              <tr><td>Water</td><td>{resources.water}</td></tr>
              <tr><td>Food</td><td>{resources.food}</td></tr>
              <tr><td>Materials</td><td>{resources.materials}</td></tr>
            </tbody>
          </table>
        </div>
        <div id="population-counter">
          Population: {population}
        </div>
        <div id="stats">
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Births</td><td>{stats.births}</td></tr>
              <tr><td>Deaths</td><td>{stats.deaths}</td></tr>
              <tr><td>Average Age</td><td>{stats.averageAge.toFixed(1)}</td></tr>
              <tr><td>Males</td><td>{stats.males}</td></tr>
              <tr><td>Females</td><td>{stats.females}</td></tr>
            </tbody>
          </table>
        </div>
        <div id="date-counter">
          Date: {formattedDate}
        </div>
      </div>
      <div className="main-area">
        <div className="left-panel">
          <button id="click-area" onClick={gatherResources}>
            {isAnimating ? (
              <img src="/click-animation.gif" alt="Gathering Animation" />
            ) : (
              `Gather Resources (+${clickPower})`
            )}
          </button>
          <button id="upgrade-click" onClick={upgradeClickPower}>
            Upgrade Click Power (Current: {clickPower}, Cost: {clickPower * 10})
          </button>
          <div id="upgrades">
            <button onClick={() => upgradeCity('power')}>Add Power Plant (Cost: {city.size * 10})</button>
            <button onClick={() => upgradeCity('water')}>Add Water Facility (Cost: {city.size * 10})</button>
            <button onClick={() => upgradeCity('food')}>Add Food Facility (Cost: {city.size * 10})</button>
            <button onClick={() => upgradeCity('building')}>Add Building (Cost: {city.size * 10})</button>
            <button onClick={() => upgradeCity('factory')}>Add Factory (Cost: {city.size * 10})</button>
          </div>
        </div>
        <div id="city-grid">
          {city.buildings.map((building, i) => (
            <div
              key={i}
              className={`building ${building.type}`}
              style={{
                top: `${building.y}%`,
                left: `${building.x}%`,
                transform: `scale(${building.scale})`,
              }}
            >
              <img src={`/${building.type}.gif`} alt={building.type} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .info-panel {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }
        #resource-counter table, #stats table {
          border-collapse: collapse;
          width: 100%;
        }
        #resource-counter th, #resource-counter td, #stats th, #stats td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        .main-area {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .left-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
        }
        #click-area {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #eee;
          border: 2px solid #ccc;
          cursor: pointer;
          position: relative;
        }
        #click-area img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        #city-grid {
          position: relative;
          width: 500px;
          height: 500px;
          margin-left: 20px;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .building {
          position: absolute;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
        }
        .building img {
          width: 100%;
          height: 100%;
        }
        #upgrade-click, #upgrades button {
          display: block;
          margin: 10px 0;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
        }
        #upgrades button {
          background-color: #007bff;
        }
      `}</style>
    </div>
  );
}
