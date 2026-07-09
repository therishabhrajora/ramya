package com.ramya.ramya.services;

import com.ramya.ramya.entities.Products;
import com.ramya.ramya.repositories.ProductsRepo;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BulkService {

    private final ProductsRepo productsRepo;

    BulkService(ProductsRepo productsRepo) {
        this.productsRepo = productsRepo;
    }

    @Transactional
    public void processBulkFile(MultipartFile file) throws Exception {
        String filename = file.getOriginalFilename();

        if (filename != null && filename.endsWith(".xlsx")) {
            parseExcel(file);
        } else if (filename != null && filename.endsWith(".csv")) {
            System.out.println("Processing CSV file: " + filename);
            parseCSV(file);
        } else {
            throw new IllegalArgumentException(
                    "Unsupported file type format. Please upload a valid .csv or .xlsx Excel file.");
        }
    }

    private void parseExcel(MultipartFile file) throws Exception {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0)
                    continue; // Skip header row

                // Guard check: Skip empty or uninitialized rows to prevent NullPointerException
                if (row.getCell(0) == null || getCellValueAsString(row.getCell(0)).isEmpty()) {
                    continue;
                }

                System.out.println(row.getCell(2));
              
                Products product = new Products();
                product.setProductId(getCellValueAsString(row.getCell(0)));
                product.setCategory(getCellValueAsString(row.getCell(1)));
                product.setCloudinaryImagePublicId(getCellValueAsString(row.getCell(2)));
                product.setDiscount(getCellValueAsString(row.getCell(3)));
                System.out.println("================="+getCellValueAsString(row.getCell(4)));
                product.setGender(getCellValueAsString(row.getCell(4)));
                product.setName(getCellValueAsString(row.getCell(5)));

                // Use safe numeric conversion methods to prevent type exceptions
                product.setOriginalPrice(getCellValueAsFloat(row.getCell(6)));
                product.setPocket(getCellValueAsInt(row.getCell(7)));
                product.setPrice(getCellValueAsFloat(row.getCell(8)));

                product.setRating(getCellValueAsFloat(row.getCell(9)));
                product.setReviewsCount(getCellValueAsInt(row.getCell(10)));
                product.setTagline(getCellValueAsString(row.getCell(11)));

                // Convert text columns smoothly into ElementCollection collections
                String color = getCellValueAsString(row.getCell(12));
                String image = getCellValueAsString(row.getCell(13));
                String size = getCellValueAsString(row.getCell(14));

                product.setColors(splitCommaText(color));
                product.setImages(splitCommaText(image));
                product.setSizes(splitCommaText(size));

                try {

                    Products saved = productsRepo.saveAndFlush(product);

                    System.out.println("Saved: " + saved.getProductId());

                } catch (Exception e) {

                    System.out.println("Failed Product: " + product.getProductId());

                    e.printStackTrace();
                }

            }
        }
    }

    private void parseCSV(MultipartFile file) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isHeader = true;
            System.out.println("Starting CSV parsing for file: " + file.getOriginalFilename());
            while ((line = br.readLine()) != null) {
                if (isHeader) {
                    isHeader = false;
                    continue;
                }
                String[] columns = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");

                if (columns.length < 15 || columns[0].trim().isEmpty())
                    continue;

                Products product = new Products();
                product.setProductId(cleanCSVField(columns[0]));
                product.setCategory(cleanCSVField(columns[1]));
                product.setCloudinaryImagePublicId(cleanCSVField(columns[2]));
                product.setDiscount(cleanCSVField(columns[3]));
                product.setGender(cleanCSVField(columns[4]));
                product.setName(cleanCSVField(columns[5]));
                product.setOriginalPrice(Float.parseFloat(cleanCSVField(columns[6])));
                product.setPocket(Integer.parseInt(cleanCSVField(columns[7])));
                product.setPrice(Float.parseFloat(cleanCSVField(columns[8])));
                product.setRating(Float.parseFloat(cleanCSVField(columns[9])));
                product.setReviewsCount(Integer.parseInt(cleanCSVField(columns[10])));
                product.setTagline(cleanCSVField(columns[11]));

                String size = cleanCSVField(columns[14]);
                String image = cleanCSVField(columns[13]);
                String color = cleanCSVField(columns[12]);

                product.setColors(Arrays.stream(color.split(","))
                        .map(String::trim)
                        .toList());
                product.setSizes(Arrays.stream(size.split(","))
                        .map(String::trim)
                        .toList());
                product.setImages(Arrays.stream(image.split(","))
                        .map(String::trim)
                        .toList());

                productsRepo.save(product);

            }
        }
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null)
            return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                }
                // Prevents adding standard integer values with trailing decimals (e.g.,
                // converts 10.0 to 10)
                double numericValue = cell.getNumericCellValue();
                if (numericValue == (long) numericValue) {
                    return String.valueOf((long) numericValue);
                }
                return String.valueOf(numericValue);
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }

    // SAFE CONVERSION HELPER: Prevents String-to-Float crash exceptions
    private float getCellValueAsFloat(Cell cell) {
        if (cell == null)
            return 0.0f;
        if (cell.getCellType() == CellType.NUMERIC)
            return (float) cell.getNumericCellValue();
        try {
            String val = getCellValueAsString(cell);
            return val.isEmpty() ? 0.0f : Float.parseFloat(val);
        } catch (NumberFormatException e) {
            return 0.0f;
        }
    }

    // SAFE CONVERSION HELPER: Prevents String-to-Int crash exceptions
    private int getCellValueAsInt(Cell cell) {
        if (cell == null)
            return 0;
        if (cell.getCellType() == CellType.NUMERIC)
            return (int) cell.getNumericCellValue();
        try {
            String val = getCellValueAsString(cell);
            return val.isEmpty() ? 0 : Integer.parseInt(val);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    // Normalizes strings by removing CSV outer wrapping quote pollution
    private String cleanCSVField(String value) {
        if (value == null)
            return "";
        String trimmed = value.trim();
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
            trimmed = trimmed.substring(1, trimmed.length() - 1).trim();
        }
        return trimmed;
    }

    private List<String> splitCommaText(String text) {
        if (text == null)
            return new ArrayList<>();
        // Strip out surrounding wrapper formatting quotes before converting to a list
        // collection
        String cleanText = cleanCSVField(text);
        if (cleanText.isEmpty())
            return new ArrayList<>();

        return Arrays.stream(cleanText.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
