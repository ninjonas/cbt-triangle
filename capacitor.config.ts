import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jonas.cbtapp",
  appName: "CBT Triangle",
  webDir: "public", // This can be any directory with a basic index.html file
  server: {
    url: "http://192.168.1.96:3000", // Replace with your local IP address and port
    cleartext: true,
  },
};
export default config;
