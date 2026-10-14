#pragma once

#include <QMainWindow>

class QStackedWidget;
class WelcomeScreen;
class WorkspaceScreen;

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget* parent = nullptr);

private slots:
    void handleOpenVault();
    void handleNewVault();
    void handleCloseVault();

private:
    QStackedWidget* m_stackedWidget;
    WelcomeScreen* m_welcomeScreen;
    WorkspaceScreen* m_workspaceScreen;
};
