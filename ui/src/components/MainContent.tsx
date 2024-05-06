import { Flex } from "antd";
import Banner from "./Banner";
import TreesList from "./TreesList";
import MembersList from "./MembersList";

export default function MainContent() {
  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap='2.3rem'>
        <Banner />
        <TreesList />
        <MembersList />
      </Flex>
    </div>
  );
}
