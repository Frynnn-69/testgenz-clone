export default function ApiDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
      
      <p className="text-gray-600 mb-8">
        This application provides RESTful API endpoints for personality testing based on the Keirsey Temperament Sorter.
      </p>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">POST</span>
            <code className="text-lg font-mono">/api/questions</code>
          </div>
          <p className="text-gray-700 mb-3">Get personality test questions for the assessment.</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm font-semibold mb-2">Response:</p>
            <code className="text-xs text-gray-600">Returns an array of question objects</code>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">POST</span>
            <code className="text-lg font-mono">/api/analyze</code>
          </div>
          <p className="text-gray-700 mb-3">Analyze test answers and return personality temperament results.</p>
          <div className="bg-gray-50 p-4 rounded space-y-2">
            <div>
              <p className="text-sm font-semibold mb-1">Request Body:</p>
              <code className="text-xs text-gray-600">{'{ "answers": [...] }'}</code>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Response:</p>
              <code className="text-xs text-gray-600">Returns personality analysis with temperament type</code>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">About the Keirsey Temperament Sorter</h2>
        <p className="text-gray-700">
          The Keirsey Temperament Sorter is a personality assessment that categorizes individuals into four temperaments: 
          Artisan, Guardian, Idealist, and Rational. This API implements the assessment and analysis logic.
        </p>
      </div>
    </div>
  );
}
