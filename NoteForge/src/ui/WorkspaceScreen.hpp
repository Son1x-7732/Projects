#pragma once

#include <QWidget>

class QLabel;

class WorkspaceScreen : public QWidget {
    Q_OBJECT

public:
    explicit WorkspaceScreen(QWidget* parent = nullptr);

    void setVaultPath(const QString& path);

signals:
    void closeVaultRequested();

private:
    QLabel* m_pathLabel;
};
