/**
 * ============================================================================
 * 파일명: ai-assistant.tsx
 * 앱: shell
 * 경로: apps/shell/components/features/ai-assistant.tsx
 * 작성일: 2025-12-19
 * ============================================================================
 *
 * [📄 파일 설명]
 * AI 어시스턴트 채팅 컴포넌트입니다.
 * 우측 하단 FAB 버튼으로 열 수 있습니다.
 * ============================================================================
 */

'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@erp/ui/components';
import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@erp/ui';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요! ERP 업무를 도와드릴 AI 어시스턴트입니다. 무엇을 도와드릴까요?',
            timestamp: new Date(),
        },
    ]);

    const handleSend = () => {
        if (!input.trim()) return;

        // 사용자 메시지 추가
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        // 모의 AI 응답
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: getAIResponse(input),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    const getAIResponse = (query: string): string => {
        if (query.includes('급여')) {
            return '이번 달 급여 관련 정보를 조회해드릴게요. 급여 메뉴 > 급여명세서에서 확인하실 수 있습니다.';
        }
        if (query.includes('휴가') || query.includes('연차')) {
            return '휴가 신청은 전자결재 > 기안작성에서 휴가신청서 양식을 선택하시면 됩니다.';
        }
        return '네, 말씀하신 내용을 확인해드리겠습니다. 조금 더 구체적으로 알려주시면 정확한 안내가 가능합니다.';
    };

    // FAB 버튼
    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg"
                aria-label="AI 어시스턴트 열기"
            >
                <Bot className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <Card
            className={cn(
                'fixed right-6 shadow-xl transition-all duration-300',
                isMinimized
                    ? 'bottom-20 w-64 h-12'
                    : 'bottom-20 w-96 h-[500px] flex flex-col'
            )}
        >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <span className="font-medium">AI 어시스턴트</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-primary-foreground hover:bg-primary/80"
                        onClick={() => setIsMinimized(!isMinimized)}
                        aria-label={isMinimized ? '최대화' : '최소화'}
                    >
                        {isMinimized ? (
                            <Maximize2 className="h-4 w-4" />
                        ) : (
                            <Minimize2 className="h-4 w-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-primary-foreground hover:bg-primary/80"
                        onClick={() => setIsOpen(false)}
                        aria-label="닫기"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* 메시지 목록 */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    'flex',
                                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                <div
                                    className={cn(
                                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                                        msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                    )}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 입력 영역 */}
                    <div className="p-3 border-t">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                                className="flex-1"
                                aria-label="메시지 입력"
                            />
                            <Button type="submit" size="icon" aria-label="전송">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </Card>
    );
}
