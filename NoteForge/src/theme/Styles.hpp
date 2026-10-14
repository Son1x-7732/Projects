#pragma once

namespace Theme {
    inline constexpr const char* ButtonStyle = R"(
        QPushButton {
            background-color: #2d2d2d;
            color: #ffffff;
            border: 1px solid #3d3d3d;
            border-radius: 8px;
            padding: 8px 16px;
        }
        QPushButton:hover {
            background-color: #3d3d3d;
            border: 1px solid #5d5d5d;
        }
        QPushButton:pressed {
            background-color: #1e1e1e;
        }
    )";
}