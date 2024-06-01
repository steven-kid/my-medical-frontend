import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ManOutlined, WomanOutlined, FileSearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import ImageUpload from "../imageUpload/ImageUpload";

function Right({ isGenerating, setIsGenerating }) {
  // 使用useState钩子来存储图片的URL
  const [image, setImage] = useState(null);
  const [sex, setSex] = useState(false); // false for male, true for female
  const [age, setAge] = useState(20);
  const [LVIDd, setLVIDd] = useState('');
  const [LVPWd, setLVPWd] = useState('');
  const [IVSd, setIVSd] = useState('');

  function reset(){
    setImage(null)
    setSex(false);
    setAge(20);
    setLVIDd('');
    setLVPWd('');
    setIVSd('');
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle> 心鉴 - 你的医疗AI🧑‍⚕️</CardTitle>
        <CardDescription>上传图片、信息获取分析报告 📄</CardDescription>
      </CardHeader>
      <Divider className="mt-0 mb-5"/>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <ImageUpload image={image} setImage={setImage}/>
            </div>
            <div className="flex h-12 items-center justify-between">
              <Label htmlFor="name">性别</Label>
              <div className="flex justify-center flex-grow">
                <Button
                  variant={!sex ? "default" : "secondary"}
                  className="w-1/3 rounded-none rounded-l-lg"
                  onClick={() => {
                    setSex(false);
                  }}
                  type="button"
                >
                  <ManOutlined className="w-4 h-4 mr-2" /> 男生
                </Button>
                {/* <Separator orientation="vertical" /> */}
                <Button
                  variant={sex ? "default" : "secondary"}
                  className="w-1/3 rounded-none rounded-r-lg"
                  onClick={() => setSex(true)}
                  type="button"
                >
                  <WomanOutlined className="w-4 h-4 mr-2" /> 女生
                </Button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between h-12">
              <Label htmlFor="name">年龄</Label>
              <Slider
                defaultValue={[age]}
                max={100}
                step={1}
                className="w-[60%] h-[50%]"
                onValueChange={(arr) => setAge(arr[0])}
              />
              {age}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">左心室的整体大小（LVIDd）</Label>
              <Input id="name" placeholder="请输入左心室的整体大小（LVIDd）" onChange={((e) => setLVIDd(e.target.value))} value={LVIDd} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">心脏左壁的厚度（LVPWd）</Label>
              <Input id="name" placeholder="请输入心脏左壁的厚度（LVPWd）" onChange={((e) => setLVPWd(e.target.value))} value={LVPWd}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">隔膜壁厚度（IVSd）</Label>
              <Input id="name" placeholder="请输入隔膜壁厚度（IVSd）" onChange={((e) => setIVSd(e.target.value))} value={IVSd}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      <Button
          variant="secondary"
          className="w-1/3"
          onClick={() => reset()}
          disabled={isGenerating}
          type="button"
        >
          <UndoOutlined className="w-4 h-4 mr-2" /> 重置
        </Button>
        <Button
          className="w-1/3"
          onClick={() => setIsGenerating(!isGenerating)}
          disabled={isGenerating}
          type="button"
        >
          <FileSearchOutlined className="w-4 h-4 mr-2" /> 分析
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Right;
