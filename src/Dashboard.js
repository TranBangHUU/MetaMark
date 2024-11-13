import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [playerName, setPlayerName] = useState('');
  const [health, setHealth] = useState(100);
  const [strength, setStrength] = useState(50);
  const [players, setPlayers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load dữ liệu từ localStorage khi component được khởi tạo
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);
  }, []);

  // Lưu danh sách players vào localStorage
  const savePlayersToStorage = (updatedPlayers) => {
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  // Hàm thêm hoặc cập nhật Player vào danh sách
  const addOrUpdatePlayer = () => {
    if (editingIndex !== null) {
      // Cập nhật Player
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = {
        ...updatedPlayers[editingIndex],
        player_name: playerName,
        health,
        strength,
      };
      setPlayers(updatedPlayers);
      savePlayersToStorage(updatedPlayers);
      setEditingIndex(null);
    } else {
      // Thêm Player mới
      const newPlayer = {
        id: new Date().getTime(),
        player_name: playerName,
        health,
        strength,
      };
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      savePlayersToStorage(updatedPlayers);
    }

    // Reset form
    setPlayerName('');
    setHealth(100);
    setStrength(50);
  };

  // Hàm xóa Player khỏi danh sách
  const deletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    savePlayersToStorage(updatedPlayers);
  };

  // Hàm để chọn Player để chỉnh sửa
  const editPlayer = (index) => {
    const playerToEdit = players[index];
    setPlayerName(playerToEdit.player_name);
    setHealth(playerToEdit.health);
    setStrength(playerToEdit.strength);
    setEditingIndex(index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{editingIndex !== null ? 'Edit Player' : 'Create Player'}</h2>
      
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Health"
        value={health}
        onChange={(e) => setHealth(Number(e.target.value))}
        style={{ marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Strength"
        value={strength}
        onChange={(e) => setStrength(Number(e.target.value))}
        style={{ marginBottom: '10px' }}
      />
      
      <button onClick={addOrUpdatePlayer} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        {editingIndex !== null ? 'Update Player' : 'Create Player'}
      </button>

      <h3>Player List</h3>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '80%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Health</th>
            <th>Strength</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.player_name}</td>
              <td>{player.health}</td>
              <td>{player.strength}</td>
              <td>
                <button onClick={() => editPlayer(index)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => deletePlayer(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
