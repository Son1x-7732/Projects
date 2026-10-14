#include "WelcomeScreen.hpp"
#include "../theme/Theme.hpp"
#include "../theme/Styles.hpp"

#include <QHBoxLayout>
#include <QLabel>
#include <QPushButton>
#include <QVBoxLayout>


WelcomeScreen::WelcomeScreen(QWidget* parent)
    : QWidget(parent)
{
    auto* mainLayout = new QVBoxLayout(this);
    mainLayout -> setSpacing(Theme::Spacing);
    mainLayout->setContentsMargins(
        Theme::WindowPadding,
        Theme::WindowPadding,
        Theme::WindowPadding,
        Theme::WindowPadding
    );

    auto* titleLabel = new QLabel("NoteForge");
    QFont titleFont = font();
    titleFont.setPointSize(Theme::TitleFontSize);
    titleFont.setBold(true);
    
    titleLabel->setFont(titleFont);

    auto* subtitleLabel = new QLabel("Your Personal Knowledge Workspace");
    QFont subtitleFont = font();
    subtitleFont.setPointSize(Theme::SubtitleFontSize);

    subtitleLabel -> setFont(subtitleFont);

    auto* buttonLayout = new QVBoxLayout;
    buttonLayout -> setSpacing(Theme::ButtonSpacing);

    auto* openButton = new QPushButton("Open Vault");
    openButton -> setFixedSize(Theme::ButtonWidth, Theme::ButtonHeight);
    openButton -> setStyleSheet(Theme::ButtonStyle);
    auto* newButton = new QPushButton("New Vault");
    newButton -> setFixedSize(Theme::ButtonWidth, Theme::ButtonHeight);
    newButton -> setStyleSheet(Theme::ButtonStyle);

    connect(openButton, &QPushButton::clicked, this, &WelcomeScreen::openVaultRequested);
    connect(newButton, &QPushButton::clicked, this, &WelcomeScreen::newVaultRequested);

    buttonLayout->addWidget(openButton);
    buttonLayout->addWidget(newButton);
    buttonLayout->setAlignment(Qt::AlignHCenter);
 

    mainLayout -> addStretch();
    mainLayout->addWidget(titleLabel, 0, Qt::AlignCenter);
    mainLayout->addWidget(subtitleLabel, 0, Qt::AlignCenter);
    mainLayout->addLayout(buttonLayout);
    mainLayout -> addStretch();
}