import { render, screen, fireEvent } from '@/test-utils';
import { ActionButtons } from './ActionButtons';

describe('ActionButtons', () => {
  it('should render both buttons', () => {
    const mockBackToHome = jest.fn();
    const mockRetakeTest = jest.fn();

    render(
      <ActionButtons
        onBackToHome={mockBackToHome}
        onRetakeTest={mockRetakeTest}
      />
    );

    expect(screen.getByRole('button', { name: /Kembali ke Beranda/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ulang Tes/i })).toBeInTheDocument();
  });

  it('should call onBackToHome when back button is clicked', () => {
    const mockBackToHome = jest.fn();
    const mockRetakeTest = jest.fn();

    render(
      <ActionButtons
        onBackToHome={mockBackToHome}
        onRetakeTest={mockRetakeTest}
      />
    );

    const backButton = screen.getByRole('button', { name: /Kembali ke Beranda/i });
    fireEvent.click(backButton);

    expect(mockBackToHome).toHaveBeenCalledTimes(1);
    expect(mockRetakeTest).not.toHaveBeenCalled();
  });

  it('should call onRetakeTest when retake button is clicked', () => {
    const mockBackToHome = jest.fn();
    const mockRetakeTest = jest.fn();

    render(
      <ActionButtons
        onBackToHome={mockBackToHome}
        onRetakeTest={mockRetakeTest}
      />
    );

    const retakeButton = screen.getByRole('button', { name: /Ulang Tes/i });
    fireEvent.click(retakeButton);

    expect(mockRetakeTest).toHaveBeenCalledTimes(1);
    expect(mockBackToHome).not.toHaveBeenCalled();
  });

  it('should handle multiple clicks on back button', () => {
    const mockBackToHome = jest.fn();
    const mockRetakeTest = jest.fn();

    render(
      <ActionButtons
        onBackToHome={mockBackToHome}
        onRetakeTest={mockRetakeTest}
      />
    );

    const backButton = screen.getByRole('button', { name: /Kembali ke Beranda/i });
    
    fireEvent.click(backButton);
    fireEvent.click(backButton);
    fireEvent.click(backButton);

    expect(mockBackToHome).toHaveBeenCalledTimes(3);
  });

  it('should handle multiple clicks on retake button', () => {
    const mockBackToHome = jest.fn();
    const mockRetakeTest = jest.fn();

    render(
      <ActionButtons
        onBackToHome={mockBackToHome}
        onRetakeTest={mockRetakeTest}
      />
    );

    const retakeButton = screen.getByRole('button', { name: /Ulang Tes/i });
    
    fireEvent.click(retakeButton);
    fireEvent.click(retakeButton);

    expect(mockRetakeTest).toHaveBeenCalledTimes(2);
  });
});
