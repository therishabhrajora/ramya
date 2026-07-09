import React, { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../app/AppClient";
import "../../style/forms/BulkUpload.css"; 
import { ENDPOINTS } from "../../services/Constants";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]); // Save file object reference
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    


    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      // 2. Dynamic Endpoint Selector routing paths safely
      let activeEndpoint = ENDPOINTS.bulkUpload;
      const response = await apiClient.post(activeEndpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success(response.data || `Bulk entry process completed!`);
      setFile(null);  
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || `Failed to process bulk upload file.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bulk-upload-container">
      <h2>Bulk Database Management</h2>
      <p className="bulk-upload-description">
        Select a target data segment below and upload your source CSV or Excel (.xlsx) data spreadsheets.
      </p>
      
      <form onSubmit={handleFormSubmit}>

        {/* 3. Integrated Radio Button Toggle Option Tiles Layout */}
        
        {/* Dynamic drop zone class layout modifier rules */}
        <div className={`file-drop-zone ${uploading ? "disabled" : ""}`}>
          <span className="upload-icon-text">
            {file ? "📄 Change selected file" : `📁 Click to browse spreadsheet for upload`}
          </span>
          <span className="upload-file-limit">Supports standard format layout (.csv, .xlsx)</span>
          
          <input 
            type="file" 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
            onChange={handleFileChange} 
            disabled={uploading}
          />
        </div>

        {/* Display name verification tag identifier marker */}
        {file && (
          <div className="selected-file-badge">
            Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
        
        <button 
          type="submit" 
          className="bulk-upload-submit-btn" 
          disabled={!file || uploading}
        >
          {uploading ? `Processing spreadsheet...` : `Upload & Save Items`}
        </button>
      </form>
    </div>
  );
}
