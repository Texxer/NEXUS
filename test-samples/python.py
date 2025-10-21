#!/usr/bin/env python3
# Monaco Editor Test - Python

def factorial(n: int) -> int:
    """Calculate factorial recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

class Editor:
    def __init__(self, file: str):
        self.file = file
        self.content = ""
    
    def save(self) -> None:
        print(f"Saved: {self.file}")