import './Animals.css';

const Animals = () => {
  const animals = [
    { name: 'Löwe', description: 'Der König der Tiere, lebt in Afrika.' },
    { name: 'Elefant', description: 'Das größte Landsäugetier, bekannt für sein Gedächtnis.' },
    { name: 'Panda', description: 'Ein bedrohter Bär aus China, liebt Bambus.' },
    { name: 'Giraffe', description: 'Das höchste Tier der Welt, mit langem Hals.' },
    { name: 'Tiger', description: 'Ein majestätischer Raubkatze aus Asien.' },
  ];

  return (
    <div className="animals">
      <h2>Unsere Tiere</h2>
      <div className="animal-list">
        {animals.map((animal, index) => (
          <div key={index} className="animal-card">
            <h3>{animal.name}</h3>
            <p>{animal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animals;