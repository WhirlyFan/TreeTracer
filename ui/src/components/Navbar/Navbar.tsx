import { Link } from "react-router-dom";
import { Flex, Input } from "antd";
import DropdownAvatar from "./DropdownAvatar";
import "./Navbar.less";

export default function Navbar() {
  return (
    <>
      <Flex align='center' justify='space-between'>
        <div>
          <Link to='/' className='navbar-title'>
            Treetracer
          </Link>
        </div>
        <Flex align='center' gap='10px'>
          {/* Replace with search bar component */}
          <Input.Search />
          <Flex align='center' gap='10px'>
            <DropdownAvatar />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
