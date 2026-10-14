#include "Application.hpp"

#include <QFont>

Application::Application(int& argc, char** argv)
    : QApplication(argc, argv)
{
    QFont appFont("JetBrainsMono Nerd Font");
    appFont.setPointSize(11);

    setFont(appFont);
}