import React from 'react'

function DriverDashboard() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      };
  return (
    <div>
        <h1>Dashboard</h1>
<button onClick={logout}>logout</button>

    </div>
  )
}

export default DriverDashboard