#include "WorkspaceScreen.hpp"
#include "../theme/Styles.hpp"
#include "../theme/Theme.hpp"

#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QLabel>
#include <QPushButton>

WorkspaceScreen::WorkspaceScreen(QWidget* parent)
    : QWidget(parent)
{
    auto* mainLayout = new QVBoxLayout(this);
    mainLayout->setContentsMargins(
        Theme::WindowPadding,
        Theme::WindowPadding,
        Theme::WindowPadding,
        Theme::WindowPadding
    );
    mainLayout->setSpacing(Theme::Spacing);

    auto* headerLayout = new QHBoxLayout();
    
    auto* titleLabel = new QLabel("Workspace");
    QFont titleFont = font();
    titleFont.setPointSize(20);
    titleFont.setBold(true);
    titleLabel->setFont(titleFont);

    auto* backButton = new QPushButton("Close Vault");
    backButton->setFixedSize(120, 36);
    backButton->setStyleSheet(Theme::ButtonStyle);

    connect(backButton, &QPushButton::clicked, this, &WorkspaceScreen::closeVaultRequested);

    headerLayout->addWidget(titleLabel);
    headerLayout->addStretch();
    headerLayout->addWidget(backButton);

    m_pathLabel = new QLabel("Active Vault: (None)");
    m_pathLabel->setStyleSheet("color: #888888; font-size: 14px;");

    auto* placeholderLabel = new QLabel("📁 NoteForge Workspace Loaded!\n\n(In Step 2, we will add the Markdown File Explorer and Note Editor here.)");
    placeholderLabel->setAlignment(Qt::AlignCenter);
    placeholderLabel->setStyleSheet("color: #cccccc; font-size: 16px; border: 2px dashed #444444; border-radius: 12px; padding: 40px;");

    mainLayout->addLayout(headerLayout);
    mainLayout->addWidget(m_pathLabel);
    mainLayout->addWidget(placeholderLabel, 1);
}

void WorkspaceScreen::setVaultPath(const QString& path) {
    m_pathLabel->setText("Active Vault: " + path);
}
