import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

/**
 * Home page component
 * @returns {JSX.Element} - Home page
 */
const Home = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks with powerful filtering and search capabilities.',
      link: '/tasks'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      title: 'API Integration',
      description: 'Fetch and display data from external APIs with loading states and error handling.',
      link: '/api-data'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Responsive Design',
      description: 'Beautiful, responsive UI that works seamlessly across all devices and screen sizes.',
      link: '#'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.24 0 1 1 0 01-1.415-1.415 5 5 0 017.07 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Modern Tech Stack',
      description: 'Built with React, Tailwind CSS, and modern development practices for optimal performance.',
      link: '#'
    }
  ];

  const technologies = [
    { name: 'React 18', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
    { name: 'Vite', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    { name: 'React Router', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    { name: 'React Hooks', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { name: 'API Integration', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white animate-fade-in">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              TaskMaster
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up">
            A modern React application demonstrating component architecture, state management, 
            hooks usage, and API integration with beautiful Tailwind CSS styling.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.location.href = '/tasks'}
            className="px-8 py-3"
          >
            Get Started
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.location.href = '/api-data'}
            className="px-8 py-3"
          >
            Explore API Data
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={toggleTheme}
            className="px-8 py-3"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>

      {/* Technologies Used */}
      <Card>
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Built With Modern Technologies
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color} transition-transform hover:scale-105`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore the powerful features that make this application a comprehensive 
            demonstration of modern React development practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              hover 
              onClick={feature.link !== '#' ? () => window.location.href = feature.link : undefined}
              className="h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                {feature.link !== '#' && (
                  <div className="flex justify-end">
                    <Button variant="primary" size="sm">
                      Explore →
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <Card>
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Core Tasks Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">React Components</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Custom Hooks</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Responsive Design</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ready to Explore?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start managing your tasks or explore the API data integration features. 
            This application showcases modern React development with clean, maintainable code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.location.href = '/tasks'}
            >
              Manage Tasks
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/api-data'}
            >
              View API Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
