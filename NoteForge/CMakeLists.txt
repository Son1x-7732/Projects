cmake_minimum_required(VERSION 3.25)

project(NoteForge VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 REQUIRED COMPONENTS Widgets)

add_executable(NoteForge
    src/main.cpp
    src/Application.cpp
    src/ui/MainWindow.cpp
    src/ui/WelcomeScreen.cpp
    src/ui/WorkspaceScreen.cpp
)

target_link_libraries(NoteForge PRIVATE
    Qt6::Widgets
)

target_compile_options(NoteForge PRIVATE
    -Wall
    -Wextra
    -Wpedantic
)
