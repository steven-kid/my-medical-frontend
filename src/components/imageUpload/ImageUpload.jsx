import React, { useState, useRef } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";

function ImageUpload({image, setImage}) {
  const fileInputRef = useRef(null);

  // 处理文件选择的函数
  const handleImageChange = (event) => {
    // 确保用户选择了文件
    if (event.target.files && event.target.files[0]) {
      // 更新图片状态为所选文件的第一个文件的URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // 触发文件输入框的点击事件
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 删除图片的函数
  const deleteImage = () => {
    // 清除图片状态
    setImage(null);
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="image-upload" style={{ display: "block" }}>
        {image ? "图片（已上传）" : "图片（未上传）"}
      </Label>
      {!image && <Button onClick={triggerFileInput} className="w-1/3" type="button">
      <CloudUploadOutlined className="w-4 h-4 mr-2"  />
        上传图片
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*" // 限制只能选择图片文件
          onChange={handleImageChange}
          style={{ display: "none" }} // 隐藏文件输入框
        >
        </input>
      </Button>}
      {image && (
        <>
          <img
            src={image}
            alt="Uploaded Image"
            style={{ maxWidth: "40%", height: "auto" }}
          />
          <Button variant="destructive" onClick={deleteImage} className="w-1/4" type="button">
          <DeleteOutlined className="w-4 h-4 mr-2"/>删除
          </Button>
        </>
      )}
    </div>
  );
}

export default ImageUpload;
