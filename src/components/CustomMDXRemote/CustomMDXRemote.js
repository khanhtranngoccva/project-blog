import React from 'react';
import {MDXRemote} from "next-mdx-remote/rsc";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CodeSnippet from "src/components/CodeSnippet";

const components = {
    pre: CodeSnippet,
    CircularColorsDemo,
    DivisionGroupsDemo,
}

function CustomMDXRemote({source}) {
    return <MDXRemote source={source} components={components}/>;
}

export default CustomMDXRemote;
