import React from 'react'

import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

const SiderLayout = (props: { children: React.ReactNode }) => {
    return <Layout>
        <Sider>Sider</Sider>
        <Layout>
            <Header>Header</Header>
            <Content>{props.children}</Content>
            <Footer>Footer</Footer>
        </Layout>
    </Layout>

}

export default SiderLayout