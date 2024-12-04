import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Popconfirm, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('/book/getbooks')
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                message.error('Failed to fetch books');
            });
    };

    const handleDelete = (isbn) => {
        axios.delete(`/book/delete/${isbn}`)
            .then(() => {
                message.success('Book deleted successfully');
                fetchBooks();
            })
            .catch((error) => {
                message.error('Failed to delete book');
            });
    };

    const handleSearch = () => {
        if (searchText.trim() === '') {
            fetchBooks();
        } else {
            axios.get(`/book/getbook/${searchText}`)
                .then((response) => {
                    setBooks([response.data]);
                })
                .catch((error) => {
                    message.error('Book not found');
                    setBooks([]);
                });
        }
    };

    const columns = [
        {
            title: 'ISBN',
            dataIndex: 'isbn',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/edit/${record.isbn}`}>
                        <Button icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Are you sure you want to delete this book?"
                        onConfirm={() => handleDelete(record.isbn)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="book-list-container">
            <h2>Book List</h2>
            <div className="search-container">
                <Input
                    placeholder="Search by ISBN"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={handleSearch}
                    style={{ width: 200 }}
                />
                <Button
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    style={{ marginLeft: 10 }}
                >
                    Search
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={books}
                rowKey="isbn"
                style={{ marginTop: 20 }}
            />
        </div>
    );
};

export default BookList;
