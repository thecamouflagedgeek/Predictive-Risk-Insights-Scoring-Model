import { useNavigate } from "react-router-dom"

export default function UploadDocs() {
  const nav = useNavigate()

  return (
    <div className="card">
      <h2>Upload KYC Documents</h2>

      <input type="file" />
      <input type="file" />

      <button onClick={() => nav("/processing")}>
        Verify Documents
      </button>
    </div>
  )
}