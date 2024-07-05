"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadPyFile = () => {


  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('')
  const [orgName, setOrgName] = useState('')
  const [id, setId] = useState('')

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };


  // useEffect(() => {
  //   const call = async () => {
  //     const response = await axios.get('http://localhost:3000/api/org');
  //     const orgs = response.data;

  //     if (address !== '') {
  //       const org = orgs.find(org => org.walletAddress === address);

  //       if (org) {
  //           setOrgName(org.name)
  //           setId(org.id)
  //       } else {
  //           console.log('Organization not found');
  //       }
  //     }
  //   }
  //   call()
  // }, [address])


  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('File not selected');
      return;
    }

    if (!file.name.endsWith('.py')) {
      setError('File must have a .py extension');
      return;
    }

    function createRandomName() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        let randomString = '';
        
        for (let i = 0; i < 16; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters[randomIndex];
            }
        
            return randomString + '.py';
        }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
        name: createRandomName(),
    });

    formData.append('pinataMetadata', metadata);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '12d57e655ebc9f452479',
          pinata_secret_api_key: '30514999db0f9ce9f48b1d8f25f9f311f12da7e0761d476b3eaa028d64fa7a1b',
        },
      });
      setCid(res.data.IpfsHash);
      console.log(cid)
      setError(null);

      const data = {
        cid: cid,
        walletAddress: address,
        OrgName: orgName,
        id: id
    };

    // const response = await axios.post('http://localhost:3000/api/upload', data);


    } catch (err) {
      setError('Error uploading file');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen px-4 sm:px-8 lg:px-28 flex justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
          Upload your client.py file
        </h1>
        {cid && (
            <div className="text-green-500 mb-4">
                File uploaded successfully! CID: {cid}
            </div>
        )}
        <input
          type="file"
          accept=".py"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="inline-block rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer mb-8"
        >
          Choose File
        </label>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-gray-500 dark:text-gray-300 flex flex-col items-center justify-center h-64 cursor-pointer mb-8"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-3 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 7l5.04-5.04a.5.5 0 01.708 0L15.96 7a.5.5 0 01-.354.854H12v7a1 1 0 01-1 1H9a1 1 0 01-1-1v-7H3.525a.5.5 0 01-.354-.854zM10 12a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {file ? (
            <p className="text-lg">{file.name}</p>
          ) : (
            <p className="text-lg">
              Drag and drop your file here, or click to select file
            </p>
          )}
        </div>
        <button
          onClick={handleUpload}
          className="inline-block rounded-lg bg-purple-500 px-6 py-3 text-base font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default UploadPyFile;
