import React from 'react'

const BLEpage = () => {
  return (
    <div className='p-6'>
        <h1 className="text-3xl font-bold">BLE connect page</h1>
        <button className='w-40 bg-gray-800 text-white p-2' id="startScanBtn" onclick="scanBLE()">Start BLE Scan</button>
        <button className='w-40 bg-gray-800 text-white p-2' id="stopScanBtn" onclick="stopScanBLE()">Stop BLE Scan</button>
        <div id="results"></div>
    </div>
  )
}

export default BLEpage