import React, { useState, useEffect } from 'react'

import { Table, Tag, Tooltip, Space } from 'antd'

import NightDay from '../../NightDay/NightDay'
import StatusTag from '../../StatusTag/StatusTag'

import classes from './HistoryTable.module.css'

const HistoryTable = props => {
  const [usernameFilters, setUsernameFilters] = useState([])
  // const [statusFilters, setStatusFilters] = useState([])

  useEffect(() => {
    const usernameSet = new Set()
    props.data.forEach(i => {
      usernameSet.add(i.username)
    })
    const filters = []
    for (const entry of usernameSet.values()) {
      filters.push({ text: entry, value: entry })
    }
    setUsernameFilters(filters)
  }, [props.data])

  const columns = [
    {
      title: 'Holder',
      dataIndex: 'holder',
      align: 'center',
      width: 50
    },
    {
      title: 'User',
      dataIndex: 'username',
      align: 'center',
      render: (text, record) => {
        if (record.user.id) {
          return (
            <Tooltip title={record.user.id.fullName} color={'blue'}>
              <span>{text}</span>
            </Tooltip>
          )
        }
      },
      filters: usernameFilters,
      onFilter: (value, record) => record.username === value
    },
    {
      title: 'Group',
      dataIndex: 'group',
      align: 'center'
    },
    {
      title: 'Dataset Name',
      dataIndex: 'datasetName',
      align: 'center'
    },
    {
      title: 'ExpNo',
      dataIndex: 'expNo',
      align: 'center'
    },
    {
      title: 'Solvent',
      dataIndex: 'solvent',
      align: 'center'
    },
    {
      title: 'Parameter Set',
      dataIndex: 'parameterSet',
      align: 'center'
    },
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      align: 'center'
    },
    {
      title: 'Title',
      dataIndex: 'title'
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt)
    },
    {
      title: 'ExpT',
      dataIndex: 'expTime',
      align: 'center'
    },
    {
      title: 'D/N',
      dataIndex: 'night',
      align: 'center',
      render: text => <NightDay night={text} />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: text => <StatusTag text={text} />,
      filters: [
        {
          text: 'Submitted',
          value: 'Submitted'
        },
        {
          text: 'Running',
          value: 'Running'
        },
        {
          text: 'Error',
          value: 'Error'
        },
        {
          text: 'Completed',
          value: 'Completed'
        }
      ],
      onFilter: (value, record) => record.status === value,
      defaultFilteredValue: ['Completed', 'Error']
    }
  ]

  const setTagColor = input => {
    switch (input) {
      case '+':
        return 'success'
      case '-':
        return 'default'
      case 'x':
        return 'error'

      default:
        return 'default'
    }
  }

  const expandElement = record => (
    <div className={classes.Expand}>
      <Space>
        <div>
          <Tag color={setTagColor(record.load)}>Load</Tag>
          <Tag color={setTagColor(record.atma)}>ATMA</Tag>
          <Tag color={setTagColor(record.spin)}>Spin</Tag>
          <Tag color={setTagColor(record.lock)}>Lock</Tag>
          <Tag color={setTagColor(record.shim)}>Shim</Tag>
          <Tag color={setTagColor(record.acq)}>Acq</Tag>
          <Tag color={setTagColor(record.proc)}>Proc</Tag>
        </div>
        <div className={classes.TimeStamp}>
          <span>Created at: </span>
          {record.createdAt}
        </div>
      </Space>
      <div className={classes.Remarks}>
        <span>Remarks: </span>
        {record.remarks}
      </div>
    </div>
  )

  return (
    <div style={{ marginBottom: '40px' }}>
      <Table
        columns={columns}
        dataSource={props.data}
        loading={props.loading}
        size='small'
        pagination={false}
        rowClassName={record => record.highlight || classes.RowHighlight}
        expandable={{ expandedRowRender: expandElement }}
      />
    </div>
  )
}

export default HistoryTable
