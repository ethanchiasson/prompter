// Teleprompter.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { useAnimationControls } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  StopCircle,
  RefreshCcw,
  Palette,
  File,
  Gauge,
  Joystick,
  PauseCircle,
} from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

interface TeleprompterProps {
  initialText: string;
  speed: number;
}

const Teleprompter: React.FC<TeleprompterProps> = ({ initialText }) => {
  const [text, setText] = useState(initialText);
  const [lines, setLines] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimation();
  const [font, setFont] = useState<string>("Trebuchet MS");

  const [isEditing, setIsEditing] = useState(false);

  const [color, setColor] = useState("#fafafa");
  const [bgColor, setBg] = useState("#09090b");
  const [fontSize, setFontSize] = useState("64px");

  interface Speed {
    name: string;
    speed: string;
  }
  const [speed, setSpeed] = useState<string>("45");

  useEffect(() => {
    const splitText = text.split("\n");
    setLines(splitText);
    restartAnimation();

    // controls.start({
    //   y: 0, // Start at the bottom of the screen
    //   transition: { duration: splitText.length * speed, ease: 'linear' },
    // //   onComplete: () => setIsPlaying(false),
    // });
  }, [text, speed, controls, font, fontSize]);

  const startAnimation = () => {
    const splitText = text.split("\n");
    setIsPlaying(true);
    controls.start({
      y: -10000, // Start at the bottom of the screen
      transition: {
        duration: splitText.length * parseInt(speed),
        ease: "linear",
      },
      //   onComplete: () => setIsPlaying(false),
    });
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    // controls.stop()
    controls.stop();
  };

  const restartAnimation = () => {
    setIsPlaying(false);
    controls.start({
      y: "500px", // Reset to the bottom
      transition: { duration: 0.1, ease: "linear" },
    });
  };

  const handleSetSpeed = () => {
    alert("worked");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div style={{ backgroundColor: bgColor }} className="flex flex-col">
      <Menubar className="flex flex-row justify-between h-[45px] rounded-none">
        <div className="flex flex-row">
          <MenubarMenu>
            {/* File controls */}
            <MenubarTrigger>
              <File className="h-4 w-4 mr-2" /> File
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setIsEditing(true)}>
                Edit <MenubarShortcut>⌘E</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            {/* Font controls */}
            <MenubarTrigger>
              {" "}
              <Palette className="h-4 w-4 mr-2" /> Styles
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Font
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger className="w-[180px] ml-2">
                    <SelectValue placeholder="Trebuchet MS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      style={{ fontFamily: "Times New Roman" }}
                      value="Times New Roman"
                    >
                      Times New Roman
                    </SelectItem>
                    <SelectItem
                      style={{ fontFamily: "Georgia" }}
                      value="Georgia"
                    >
                      Georgia
                    </SelectItem>
                    <SelectItem
                      style={{ fontFamily: "Courier New" }}
                      value="Courier New"
                    >
                      Courier New
                    </SelectItem>
                    <SelectItem
                      style={{ fontFamily: "Trebuchet MS" }}
                      value="Trebuchet MS"
                    >
                      Trebuchet MS
                    </SelectItem>
                    <SelectItem style={{ fontFamily: "Tahoma" }} value="Tahoma">
                      Tahoma
                    </SelectItem>
                    <SelectItem
                      style={{ fontFamily: "Verdana" }}
                      value="Verdana"
                    >
                      Verdana
                    </SelectItem>
                  </SelectContent>
                </Select>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Font Size
                <Select onValueChange={setFontSize}>
                  <SelectTrigger className="w-[180px] ml-2">
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24px">Small</SelectItem>
                    <SelectItem value="32px">Medium</SelectItem>
                    <SelectItem value="48px">Large</SelectItem>
                    <SelectItem value="72px">Giant</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Input  max={128} min={8} className="ml-2 w-[80px] justify-end"/> */}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <div className="flex flex-col p-2">
                  <p>Font Color</p>
                  <p className="text-gray-300 p-2">{color}</p>
                  <HexColorPicker
                    style={{ width: "150px", height: "100px" }}
                    color={color}
                    onChange={setColor}
                  />
                </div>
              </MenubarItem>
              <MenubarItem>
                <div className="flex flex-col p-2">
                  <p>Background Color</p>
                  <p className="text-gray-300 p-2">{bgColor}</p>
                  <HexColorPicker
                    style={{ width: "150px", height: "100px" }}
                    color={bgColor}
                    onChange={setBg}
                  />
                </div>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            {/* Font controls */}
            <MenubarTrigger>
              {" "}
              <Gauge className="h-4 w-4 mr-2" />
              Speed
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Speed
                <Select onValueChange={setSpeed}>
                  <SelectTrigger className="w-[180px] ml-2">
                    <SelectValue
                      placeholder={
                        speed === "80"
                          ? "Slow"
                          : speed === "45"
                          ? "Steady"
                          : speed === "28"
                          ? "Fast"
                          : speed == "10"
                          ? "Faster"
                          : ""
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"80"}>Slow</SelectItem>
                    <SelectItem value={"45"}>Steady</SelectItem>
                    <SelectItem value={"28"}>Fast</SelectItem>
                    <SelectItem value={"10"}>Faster</SelectItem>
                    {/* <SelectItem value={"20"}>Faster</SelectItem> */}
                  </SelectContent>
                </Select>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>
        <MenubarMenu>
          {/* <MenubarTrigger>
            {" "}
            <Joystick className="h-4 w-4 mr-2" />
            Controls
          </MenubarTrigger> */}
          <div className="">
            <Button onClick={startAnimation} disabled={isPlaying}>
              <Play className="w-5 h-5" />
            </Button>
            <Button onClick={stopAnimation} disabled={!isPlaying}>
              <Pause className="w-5 h-5" />
            </Button>
            <Button onClick={restartAnimation}>
              <RefreshCcw className="w-5 h-5" />
            </Button>
          </div>
        </MenubarMenu>
      </Menubar>

      <Drawer open={isEditing} onOpenChange={setIsEditing}>
        <DrawerContent>
          <DrawerHeader></DrawerHeader>
          <textarea
            value={text}
            onChange={handleInputChange}
            className="min-h-[400px] bg-black"
          />
          <DrawerFooter>
            <DrawerClose>
              <Button onClick={() => setIsEditing(false)}>Save</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div
        style={{ fontSize: fontSize, fontFamily: font }}
        className={`x w-full overflow-hidden rounded-md text-white relative p-4 font-${font}`}
      >
        <motion.div
          style={{ color: color }}
          // initial={{ y: "80vh" }} // Start just below the container
          animate={controls}
          //   style={{ position: "absolute", width: "100%" }}
        >
          {lines.map((line, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              {line}
            </div>
          ))}
        </motion.div>
      </div>
      {/* 
      <div className="absolute bottom-5 space-x-4">
        <Button onClick={startAnimation} disabled={isPlaying}>
          <Play className="w-4 h-4" /> Start
        </Button>
        <Button onClick={stopAnimation} disabled={!isPlaying}>
          <StopCircle className="w-4 h-4" /> Stop
        </Button>
        <Button onClick={restartAnimation} disabled={isPlaying}>
          <RefreshCcw className="w-4 h-4" /> Restart
        </Button>
      </div> */}
    </div>
  );
};

export default Teleprompter;
