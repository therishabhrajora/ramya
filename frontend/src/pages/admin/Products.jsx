import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

import NavBar from "../../components/page/NavBar";
import Footer from "../../components/page/Footer";
import "../../style/page/Products.css";

import { ENDPOINTS } from "../../services/Constants";

function Products() {
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, {
        type: "binary",
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      setPreviewData(json);
    };

    reader.readAsBinaryString(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV or Excel file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        ENDPOINTS.bulkUploadProducts,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert("Products uploaded successfully.");

      setFile(null);
      setPreviewData([]);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="bulk-upload-container">

        <form
          className="bulk-upload-form"
          onSubmit={handleUpload}
        >

          <h2>Bulk Upload Products</h2>

          <div className="file-box">

            <label>Select CSV / Excel File</label>

            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />

            {file && (
              <p className="file-name">
                {file.name}
              </p>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Products"}
          </button>

        </form>

        {previewData.length > 0 && (

          <div className="preview-table">

            <h3>
              Preview ({previewData.length} Records)
            </h3>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  {previewData.slice(0, 10).map((row, index) => (

                    <tr key={index}>

                      {Object.values(row).map((value, i) => (
                        <td key={i}>{String(value)}</td>
                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {previewData.length > 10 && (
              <p>Showing first 10 rows only...</p>
            )}

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default Products;