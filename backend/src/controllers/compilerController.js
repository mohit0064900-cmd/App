const axios = require('axios');

const languageMap = {
  // Mandatory languages - most prominently supported
  c: { id: 50, name: 'C (GCC 9.2.0)', priority: 'mandatory', icon: '🔧' },
  cpp: { id: 54, name: 'C++ (GCC 9.2.0)', priority: 'mandatory', icon: '⚡' },
  java: { id: 62, name: 'Java (OpenJDK 13.0.1)', priority: 'mandatory', icon: '☕' },
  // Additional supported languages
  python: { id: 71, name: 'Python (3.8.1)', priority: 'optional', icon: '🐍' },
  javascript: { id: 63, name: 'JavaScript (Node.js 12.14.0)', priority: 'optional', icon: '🟨' },
  csharp: { id: 51, name: 'C# (Mono 6.6.0.161)', priority: 'optional', icon: '💜' },
  // Future expansions (commented out - ready for implementation)
  // go: { id: 60, name: 'Go (1.13.5)', priority: 'optional', icon: '🚀' },
  // php: { id: 68, name: 'PHP (7.4.1)', priority: 'optional', icon: '🐘' },
  // rust: { id: 73, name: 'Rust (1.40.0)', priority: 'optional', icon: '🦀' }
};

const executeCode = async (req, res, next) => {
  try {
    const { language, code, input = '' } = req.body;

    if (!languageMap[language]) {
      return res.status(400).json({
        success: false,
        message: 'Unsupported language'
      });
    }

    const languageId = languageMap[language].id;

    const submissionData = {
      source_code: Buffer.from(code).toString('base64'),
      language_id: languageId,
      stdin: Buffer.from(input).toString('base64'),
      cpu_time_limit: 2,
      memory_limit: 128000
    };

    const options = {
      method: 'POST',
      url: `${process.env.JUDGE0_API_URL}/submissions`,
      params: {
        base64_encoded: 'true',
        wait: 'true',
        fields: '*'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': process.env.JUDGE0_API_HOST
      },
      data: submissionData
    };

    const response = await axios.request(options);
    const result = response.data;

    let output = '';
    let error = '';
    let status = result.status.description;

    if (result.stdout) {
      output = Buffer.from(result.stdout, 'base64').toString('utf-8');
    }

    if (result.stderr) {
      error = Buffer.from(result.stderr, 'base64').toString('utf-8');
    }

    if (result.compile_output) {
      error = Buffer.from(result.compile_output, 'base64').toString('utf-8');
    }

    res.status(200).json({
      success: true,
      output: output || error || 'No output',
      status: status,
      executionTime: result.time ? `${result.time}s` : 'N/A',
      memory: result.memory ? `${(result.memory / 1024).toFixed(2)} MB` : 'N/A',
      language: languageMap[language].name
    });
  } catch (error) {
    console.error('Compiler Error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit exceeded. Please try again later.'
      });
    }

    next(error);
  }
};

const getSupportedLanguages = async (req, res, next) => {
  try {
    const languages = Object.keys(languageMap).map(key => ({
      key: key,
      name: languageMap[key].name,
      id: languageMap[key].id,
      priority: languageMap[key].priority,
      icon: languageMap[key].icon
    }));

    // Sort by priority - mandatory first, then optional
    languages.sort((a, b) => {
      if (a.priority === 'mandatory' && b.priority === 'optional') return -1;
      if (a.priority === 'optional' && b.priority === 'mandatory') return 1;
      return 0;
    });

    res.status(200).json({
      success: true,
      languages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  executeCode,
  getSupportedLanguages
};
