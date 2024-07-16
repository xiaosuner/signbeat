import React from 'react';
import { Card, Progress, Row, Col } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const cardData = [
    { id: 1, smallTitle: '小标题1', mainTitle: '加粗大标题1', description: '这是一个小的说明文字。', progress: 70, completed: true },
    { id: 2, smallTitle: '小标题2', mainTitle: '加粗大标题2', description: '这是一个小的说明文字。', progress: 50, completed: false },
    { id: 3, smallTitle: '小标题3', mainTitle: '加粗大标题3', description: '这是一个小的说明文字。', progress: 90, completed: true },
    { id: 4, smallTitle: '小标题4', mainTitle: '加粗大标题4', description: '这是一个小的说明文字。', progress: 30, completed: false },
    { id: 5, smallTitle: '小标题5', mainTitle: '加粗大标题5', description: '这是一个小的说明文字。', progress: 100, completed: true },
];

const handleCardClick = (navigate, path) => {
    navigate(path);
};

export const ContentComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="site-layout-content">
            {cardData.map((item, index) => (
                <Row key={item.id} gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                    <Col span={24}>
                        {index === 0 ? (
                            <Card hoverable onClick={() => handleCardClick(navigate, "/pages/LearningPages/chapter1")} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ flex: 1, paddingRight: '20px' }}>
                                        <div style={{ marginBottom: '10px', fontSize: '14px', backgroundColor: 'rgba(255, 165, 0, 0.5)', borderRadius: '8px', padding: '2px 8px', display: 'inline-block' }}>
                                            {item.smallTitle}
                                        </div>
                                        <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>{item.mainTitle}</div>
                                        <div style={{ marginBottom: '10px', fontSize: '12px' }}>{item.description}</div>
                                        <Progress percent={item.progress} />
                                    </div>
                                    <div style={{ marginLeft: '20px', flexShrink: 0 }}>
                                        {item.completed ? <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} /> : <CloseCircleOutlined style={{ color: 'red', fontSize: '24px' }} />}
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <Card style={{ cursor: 'default' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ flex: 1, paddingRight: '20px' }}>
                                        <div style={{ marginBottom: '10px', fontSize: '14px', backgroundColor: 'rgba(255, 165, 0, 0.5)', borderRadius: '8px', padding: '2px 8px', display: 'inline-block' }}>
                                            {item.smallTitle}
                                        </div>
                                        <div style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>{item.mainTitle}</div>
                                        <div style={{ marginBottom: '10px', fontSize: '12px' }}>{item.description}</div>
                                        <Progress percent={item.progress} />
                                    </div>
                                    <div style={{ marginLeft: '20px', flexShrink: 0 }}>
                                        {item.completed ? <CheckCircleOutlined style={{ color: 'green', fontSize: '24px' }} /> : <CloseCircleOutlined style={{ color: 'red', fontSize: '24px' }} />}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </Col>
                </Row>
            ))}
        </div>
    );
};
