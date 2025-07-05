package com.ramya.ramya.services;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import helper.AppConstants;

@Service
public class ImageService {

    private final Cloudinary cloudinary;
    
    @Autowired
    ImageService(Cloudinary cloudinary){
        this.cloudinary=cloudinary;
    }

    public String uploadImage(MultipartFile productImage,String filename){
        try{
            byte[] data=new byte[productImage.getInputStream().available()];
            productImage.getInputStream().read(data);
            cloudinary.uploader().upload(data, ObjectUtils.asMap("public_id",filename));
            return this.getURlFormPublicId(filename);
        }catch(IOException e){
            e.printStackTrace();
            return null;
        }
    }

    public String getURlFormPublicId(String publicId){
        return cloudinary.url().transformation(new Transformation<>().width(AppConstants.PRODUCT_IMAGE_WIDTH).height(AppConstants.PRODUCT_IMAGE_HEIGHT).crop(AppConstants.PRODUCT_IMAGE_CROP)).generate(publicId);
    }
}
