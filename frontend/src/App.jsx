import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [records, setRecords] = useState([])
  const [file, setFile] = useState(null)

  const fetchRecords = async () => {

    const res = await axios.get(
      'https://breathe-esg-xfmb.onrender.com/api/records/'
    )

    setRecords(res.data)
  }

  useEffect(() => {
   
  }, [])

  const uploadSAP = async () => {

    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    try {

      await axios.post(
        'https://breathe-esg-xfmb.onrender.com/api/upload/sap/',
        formData
      )

      alert('SAP file uploaded successfully')

      fetchRecords()

    } catch (error) {

      console.error(error)

      alert('Upload failed')
    }
  }

  const uploadUtility = async () => {

    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    try {

      await axios.post(
        'https://breathe-esg-xfmb.onrender.com/api/upload/utility/',
        formData
      )

      alert('Utility file uploaded successfully')

      fetchRecords()

    } catch (error) {

      console.error(error)

      alert('Upload failed')
    }
  }

  const uploadTravel = async () => {

    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    try {

      await axios.post(
        'https://breathe-esg-xfmb.onrender.com/api/upload/travel/',
        formData
      )

      alert('Travel file uploaded successfully')

      fetchRecords()

    } catch (error) {

      console.error(error)

      alert('Upload failed')
    }
  }

  return (
    <div
      style={{
        padding: 40,
        fontFamily: 'Arial'
      }}
    >

      <h1>Breathe ESG Dashboard</h1>

      <div
        style={{
          marginBottom: 20
        }}
      >

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadSAP}
          style={{
            marginLeft: 10,
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Upload SAP CSV
        </button>

        <button
          onClick={uploadUtility}
          style={{
            marginLeft: 10,
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Upload Utility CSV
        </button>

        <button
          onClick={uploadTravel}
          style={{
            marginLeft: 10,
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Upload Travel CSV
        </button>

      </div>

      <hr />

      <h2>Emission Records</h2>

      {
        records.length === 0 ? (
          <p>No records found</p>
        ) : (
          records.map((r) => (

            <div
              key={r.id}
              style={{
                border: r.is_suspicious
                  ? '2px solid red'
                  : '1px solid gray',

                padding: 15,
                marginBottom: 15,
                borderRadius: 5
              }}
            >

              <p>
                <strong>Activity:</strong>
                {' '}
                {r.activity_type}
              </p>

              <p>
                <strong>Value:</strong>
                {' '}
                {r.raw_value}
              </p>

              <p>
                <strong>Unit:</strong>
                {' '}
                {r.unit}
              </p>

              <p>
                <strong>Status:</strong>
                {' '}

                <span
                  style={{
                    color:
                      r.status === 'APPROVED'
                        ? 'green'
                        : r.status === 'REJECTED'
                        ? 'red'
                        : 'orange',

                    fontWeight: 'bold'
                  }}
                >
                  {r.status}
                </span>

              </p>

              <p>
                <strong>Suspicious:</strong>
                {' '}
                {r.is_suspicious ? 'YES' : 'NO'}
              </p>

              <div style={{ marginTop: 10 }}>

                <button
                  onClick={async () => {

                    await axios.post(
                      `https://breathe-esg-xfmb.onrender.com/api/records/${r.id}/status/`,
                      {
                        status: 'APPROVED'
                      }
                    )

                    fetchRecords()
                  }}

                  style={{
                    marginRight: 10,
                    padding: 8
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={async () => {

                    await axios.post(
                      `https://breathe-esg-xfmb.onrender.com/api/records/${r.id}/status/`,
                      {
                        status: 'REJECTED'
                      }
                    )

                    fetchRecords()
                  }}

                  style={{
                    padding: 8
                  }}
                >
                  Reject
                </button>

              </div>

            </div>
          ))
        )
      }

    </div>
  )
}

export default App