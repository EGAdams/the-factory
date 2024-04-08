# Who you are
You are a world-class iOS Developer who is an expert at using iOS accelerometers and Core Motion to precisely measure g-forces and vehicle speed.

Here is our app manifest:
```manifest
# G-Force Braking App Manifest

## Overview
This manifest serves as a comprehensive guide for developing the G-Force Braking App. The app aims to improve driving safety by enhancing braking efficiency and minimizing passenger g-force impact through real-time monitoring and feedback on braking performance. Each app component should be developed to assist drivers in refining their braking technique for smoother deceleration and improved safety.

## Core Features

### G-Force Gauge
- **Purpose**: To visually display real-time g-force levels experienced by the vehicle, aiding in the understanding of braking and acceleration impacts.
- **Design**: A gauge ranging from -100 (-1g) to 100 (1g) with a red needle indicating current g-force levels.
- **Integration**: Should dynamically update based on real-time vehicle acceleration and deceleration data.

### Speedometer
- **Purpose**: To track and display vehicle speed within a specific range (0 to 25 mph/kph), allowing for precise control at low speeds.
- **Design**: Integrated within the g-force gauge, featuring a yellow needle for a clear distinction.
- **Functionality**: Must accurately reflect the vehicle's current speed, with updates in real-time for immediate feedback.

### Speed Alert
- **Objective**: To alert drivers when speed exceeds a set threshold (20 mph/kph), encouraging safer driving speeds, especially in contexts requiring sudden stops.
- **Implementation**: An audible beep and a visual warning (red text) on the app interface, triggered when the speed threshold is crossed.
- **Customization**: Allow for sensitivity adjustments to accommodate different driving environments and preferences.

### Session Log
- **Goal**: To record and save data on peak g-force, driver’s name, and road conditions after each drive, facilitating tracking and improvement over time.
- **Content**: Log entries should include date and time, peak g-force, driver’s name, and a brief description of road conditions.
- **Accessibility**: Ensure easy access and review of historical data for drivers, with options for exporting or sharing session logs for further analysis.

## Development Principles
- **User-Centric Design**: Focus on intuitive interfaces and clear, meaningful feedback to users.
- **Accuracy**: Ensure all measurements and alerts are precise and reliable to foster trust and reliance on the app for driving safety improvements.
- **Privacy**: Adhere to best practices in data privacy and security, especially concerning user-generated content and personal information.
- **Extensibility**: Develop each component with future enhancements in mind, allowing for easy integration of additional features or improvements based on user feedback.

## Conclusion
The G-Force Braking App is envisioned as a tool that not only enhances driving safety but also promotes a deeper understanding of vehicle dynamics through technology. By adhering to the guidelines outlined in this manifest, developers will contribute to a cohesive and impactful user experience focused on braking efficiency and passenger comfort.
```

# Your Task
Create a detailed mermaid diagram showing all the interactions for the speedometer and G-Force gauge.  Think about how the Swift source code would look like and try to convey it in the diagram.  I will be using this diagram to attempt to instruct other dumb AI agents on how to write the Swift source code for this system.  We already have a storyboard, so don't worry about that at all.  Focus on making this gauge out of pure Swift source code.  Sure we will connect it to a storyboard when we are finished, but at this point in time, I want you to focus all of your efforts in creating a masterpiece of a Mermaid sequence diagram that will help us code the speedometer and G-Force gauge in Swift.  Make sure to use low-pass filters to smooth out the readings.  Use all three iOS accelerometer vectors (x,y,z) to help make the most accurate calculation of the current speed of the iPhone.  And don't forget that the accelerometer readings from iOS are in gravity units already, so there will be no need to use the 9.8 constant to convert to G's.

```mermaid
sequenceDiagram
    participant UI as User Interface
    participant CM as CoreMotion Manager
    participant LPF as Low-Pass Filter
    participant Calc as Calculation Module
    participant SG as Speedometer Gauge
    participant GG as G-Force Gauge

    UI->>CM: Initialize CoreMotion
    loop Every Frame
        CM->>CM: Fetch Accelerometer Data(x, y, z)
        CM->>LPF: Apply Low-Pass Filter
        LPF->>Calc: Calculate G-Force
        Calc->>GG: Update G-Force Display
        Calc->>Calc: Calculate Speed(delta V)
        Calc->>SG: Update Speed Display
    end
    UI->>UI: Listen for Speed Alerts
    alt Speed exceeds 20 mph/kph
        UI->>UI: Trigger Alert (Sound & Visual)
    end

    ```
