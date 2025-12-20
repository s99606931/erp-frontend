/**
 * ============================================================================
 * 파일명: shortcuts-help.tsx
 * 설명: 키보드 단축키 도움말 모달
 * ============================================================================
 */

'use client';

import { useState, useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';
import { Button } from '@erp/ui';
import { KEYBOARD_SHORTCUTS } from '@/config/keyboard-shortcuts';
import type { KeyBinding } from '@/config/keyboard-shortcuts';

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  // 단축키 리스너 (Ctrl+/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+/
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setOpen(prev => !prev);
      }

      // ESC로 닫기
      if (open && e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  if (!open) return null;

  // 카테고리별 그룹화
  const groups = KEYBOARD_SHORTCUTS.reduce((acc, item) => {
    const list = acc[item.category] ?? [];
    list.push(item);
    acc[item.category] = list;
    return acc;
  }, {} as Record<string, KeyBinding[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200 border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">키보드 단축키</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 gap-x-8 gap-y-8">
          {Object.entries(groups).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.command} className="flex items-center justify-between p-1">
                    <span className="text-sm">{item.description}</span>
                    <div className="flex gap-1">
                      {item.key.split('+').map((k, i) => (
                        <kbd key={i} className="px-2 py-1 text-xs font-mono bg-muted rounded border min-w-[24px] text-center capitalize">
                          {k === ' ' ? 'Space' : k}
                        </kbd>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/5 text-center text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-background border rounded mr-1">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-background border rounded">?</kbd> 키로 언제든지 다시 열 수 있습니다.
        </div>
      </div>
    </div>
  );
}
