import { render, screen } from '@/test-utils';
import { ResultContent } from './ResultContent';

describe('ResultContent', () => {
  const defaultProps = {
    weatherType: 'Sunny',
    analysis: 'You are a bright and optimistic person who brings warmth to others.',
    userName: 'John Doe',
  };

  it('should render user name greeting', () => {
    render(<ResultContent {...defaultProps} />);
    
    expect(screen.getByText(/Halo, John Doe!/i)).toBeInTheDocument();
  });

  it('should render weather type in heading', () => {
    render(<ResultContent {...defaultProps} />);
    
    expect(screen.getByRole('heading', { name: /Tipe Kepribadian: Sunny/i })).toBeInTheDocument();
  });

  it('should render analysis text', () => {
    render(<ResultContent {...defaultProps} />);
    
    expect(screen.getByText(defaultProps.analysis)).toBeInTheDocument();
  });

  it('should render with different weather types', () => {
    const weatherTypes = ['Rainy', 'Stormy', 'Cloudy'];
    
    weatherTypes.forEach((weatherType) => {
      const { unmount } = render(
        <ResultContent {...defaultProps} weatherType={weatherType} />
      );
      
      expect(screen.getByRole('heading', { name: new RegExp(`Tipe Kepribadian: ${weatherType}`, 'i') })).toBeInTheDocument();
      
      unmount();
    });
  });

  it('should render with long analysis text', () => {
    const longAnalysis = 'This is a very long analysis text. '.repeat(20);
    
    render(<ResultContent {...defaultProps} analysis={longAnalysis} />);
    
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'P' && element?.textContent === longAnalysis;
    })).toBeInTheDocument();
  });

  it('should render with multiline analysis text', () => {
    const multilineAnalysis = 'Line 1\nLine 2\nLine 3';
    
    render(<ResultContent {...defaultProps} analysis={multilineAnalysis} />);
    
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'P' && element?.textContent === multilineAnalysis;
    })).toBeInTheDocument();
  });

  it('should render with user name containing special characters', () => {
    const specialName = "O'Brien-Smith";
    
    render(<ResultContent {...defaultProps} userName={specialName} />);
    
    expect(screen.getByText(new RegExp(`Halo, ${specialName}!`, 'i'))).toBeInTheDocument();
  });
});
