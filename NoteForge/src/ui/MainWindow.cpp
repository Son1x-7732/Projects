#include "MainWindow.hpp"
#include "WelcomeScreen.hpp"
#include "WorkspaceScreen.hpp"

#include <QStackedWidget>
#include <QFileDialog>
#include <QMessageBox>

MainWindow::MainWindow(QWidget* parent)
    : QMainWindow(parent)
{
    setWindowTitle("NoteForge");
    resize(1200, 800);

    m_stackedWidget = new QStackedWidget(this);

    m_welcomeScreen = new WelcomeScreen(this);
    m_workspaceScreen = new WorkspaceScreen(this);

    m_stackedWidget->addWidget(m_welcomeScreen);
    m_stackedWidget->addWidget(m_workspaceScreen);

    setCentralWidget(m_stackedWidget);

    // Connect signals from WelcomeScreen
    connect(m_welcomeScreen, &WelcomeScreen::openVaultRequested, this, &MainWindow::handleOpenVault);
    connect(m_welcomeScreen, &WelcomeScreen::newVaultRequested, this, &MainWindow::handleNewVault);

    // Connect signal from WorkspaceScreen
    connect(m_workspaceScreen, &WorkspaceScreen::closeVaultRequested, this, &MainWindow::handleCloseVault);
}

void MainWindow::handleOpenVault() {
    QString folderPath = QFileDialog::getExistingDirectory(
        this,
        "Open NoteForge Vault",
        QDir::homePath(),
        QFileDialog::ShowDirsOnly | QFileDialog::DontResolveSymlinks
    );

    if (!folderPath.isEmpty()) {
        m_workspaceScreen->setVaultPath(folderPath);
        m_stackedWidget->setCurrentWidget(m_workspaceScreen);
    }
}

void MainWindow::handleNewVault() {
    QString folderPath = QFileDialog::getExistingDirectory(
        this,
        "Select Directory for New Vault",
        QDir::homePath(),
        QFileDialog::ShowDirsOnly | QFileDialog::DontResolveSymlinks
    );

    if (!folderPath.isEmpty()) {
        m_workspaceScreen->setVaultPath(folderPath);
        m_stackedWidget->setCurrentWidget(m_workspaceScreen);
    }
}

void MainWindow::handleCloseVault() {
    m_stackedWidget->setCurrentWidget(m_welcomeScreen);
}
