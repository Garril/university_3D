import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import store from '../../../../store/index'
import './antTable.css'

interface DataType {
  key: string,
  location: string,
  section: string;
  course_name: string;
  teacher: string;
  class_name: string;
}

type DataIndex = keyof DataType;

const App: React.FC = () => {
  // table相关
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [curPage,setCurPage] = useState(1);
  const [curPageSize,setCurPageSize] = useState(10);
  const [total,setTotal] = useState(0);

  const searchInput = useRef<InputRef>(null);

  // 渲染的数据
  const [data, setData] = useState([]);
  // 是否渲染的为空闲教室
  const [isEmpty,setIsEmpty] = useState(false);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 80 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 80 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  store.subscribe(() => {
    console.log(store.getState());
    let _key = store.getState().cur_key;
    let _isEmpty = store.getState().isEmpty;
    let list;
    if(_isEmpty) {
      list = store.getState().empty_data[_key];
    } else {
      list = store.getState().class_data[_key];
    }
    // console.log(_key,list);
    setIsEmpty(store.getState().isEmpty);
    setData(list);
    setTotal(list?.length);
  })

  const table_class_row: ColumnsType<DataType> = [
    {
      title: '课室',
      dataIndex: 'location',
      key: 'location',
      width: '12%',
      ...getColumnSearchProps('location'),
      sorter: (a, b) => {
        return Number(a.location.slice(-3)) - Number(b.location.slice(-3))
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '节次',
      dataIndex: 'section',
      key: 'section',
      width: '12%',
      ...getColumnSearchProps('section'),
      sorter: (a, b) => {
        return Number(a.section.slice(0,4)) - Number(b.section.slice(0,4))
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '课程名',
      dataIndex: 'course_name',
      key: 'course_name',
      width: '20%',
      ...getColumnSearchProps('course_name'),
    },
    {
      title: '教师',
      dataIndex: 'teacher',
      key: 'teacher',
      width: '15%',
      ...getColumnSearchProps('teacher'),
    },
    {
      title: '班级',
      dataIndex: 'class_name',
      key: 'class_name',
      width: '40%',
      ...getColumnSearchProps('class_name'),
    }
  ];
  const table_empty_row: ColumnsType<DataType> = [
    {
      title: '课室',
      dataIndex: 'location',
      key: 'location',
      width: '12%',
      ...getColumnSearchProps('location'),
      sorter: (a, b) => {
        return Number(a.location.slice(-3)) - Number(b.location.slice(-3))
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '节次',
      dataIndex: 'section',
      key: 'section',
      width: '12%',
      ...getColumnSearchProps('section'),
      sorter: (a, b) => {
        return Number(a.section.slice(0,4)) - Number(b.section.slice(0,4))
      },
      sortDirections: ['descend', 'ascend'],
    }
  ];


  return <Table 
            columns={isEmpty? table_empty_row : table_class_row} 
            dataSource={data}
            rowClassName={'relatedPartyMaint'}
            pagination={{
              position: ['bottomCenter'],
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => {
                return (
                  <span
                      style={{
                        fontSize: 16,
                        color: '#264653',
                        fontFamily: "微软雅黑",
                      }}
                    >共{total}条数据</span>
                )
              },
              total: total,
              current: curPage,
              pageSize: curPageSize,
              onChange: (page, pageSize) => {
                setCurPage(page);
                setCurPageSize(pageSize);
              },
            }}
        />;
};

export default App;