const TeamMembers = () => {
    const members = [
      { name: "John Doe", role: "CEO", image: "/path/to/image1.jpg" },
      { name: "Jane Smith", role: "CTO", image: "/path/to/image2.jpg" },
      { name: "Alice Johnson", role: "Designer", image: "/path/to/image3.jpg" },
    ];
  
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <img src={member.image} alt={member.name} className="w-full h-40 object-cover rounded-t-lg" />
            <h2 className="text-xl font-bold mt-2">{member.name}</h2>
            <p className="text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default TeamMembers;
  